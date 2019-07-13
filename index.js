const { dialog } = require('electron');
const { Extension, log, INPUT_METHOD, PLATFORMS } = require('deckboard-kit');
const { shutdown } = require('wintools');

class PowerControlExtension extends Extension {
	constructor() {
		super();
		this.name = 'Power Option';
		this.platforms = [PLATFORMS.WINDOWS, PLATFORMS.MAC];
		this.inputs = [
			{
				label: 'Power Option',
				value: 'power-option',
				icon: 'power-off',
				color: '#34495e',
				input: [
					{
						label: 'Action',
						ref: 'powerAction',
						type: INPUT_METHOD.INPUT_SELECT,
						items: [
							{
								label: 'Shutdown',
								value: 'shutdown'
							},
							{
								label: 'Restart',
								value: 'restart'
							}
						]
					},
					{
						label: 'With Confirmation',
						ref: 'confirmation',
						type: INPUT_METHOD.INPUT_CHECKBOX,
						default: true
					}
				]
			}
		];
	}

	execute(action, { powerAction, confirmation = true }) {
		log.info(`${action} ${powerAction}`);
		switch (action) {
			case 'power-option': {
				switch (powerAction) {
					case 'shutdown':
						if (confirmation)
							dialog.showMessageBox(
								null,
								{
									type: 'question',
									buttons: ['Cancel', 'Yes'],
									defaultId: 0,
									title: 'Shutdown',
									message:
										'Do you want to shutdown the computer?'
								},
								response => {
									if (response === 1) shutdown.poweroff();
								}
							);
						else shutdown.poweroff();
						break;
					case 'restart':
						if (confirmation)
							dialog.showMessageBox(
								null,
								{
									type: 'question',
									buttons: ['Cancel', 'Yes'],
									defaultId: 0,
									title: 'Shutdown',
									message:
										'Do you want to restart the computer?'
								},
								response => {
									if (response === 1) shutdown.restart();
								}
							);
						else shutdown.restart();
						break;
					default:
						break;
				}
			}
			default:
				break;
		}
	}
}

module.exports = new PowerControlExtension();
