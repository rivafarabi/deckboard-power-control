const { Extension, INPUT_METHOD, PLATFORMS } = require('deckboard-kit');
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
					}
				]
			}
		];
	}

	execute = (action, { powerAction }) => {
		extensionLog('info', `${action} ${powerAction}`);
		switch (action) {
			case 'power-option': {
				switch (powerAction) {
					case 'shutdown':
						shutdown.poweroff();
						break;
					case 'restart':
						shutdown.restart();
						break;
					default:
						break;
				}
			}
			default:
				break;
		}
	};
}

module.exports = new PowerControlExtension();
