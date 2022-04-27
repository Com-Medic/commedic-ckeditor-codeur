
import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import ButtonView from '@ckeditor/ckeditor5-ui/src/button/buttonview';
import {addToolbarToDropdown, createDropdown, SplitButtonView, SwitchButtonView} from "@ckeditor/ckeditor5-ui";

export default class AloeMagicUI extends Plugin {
	init() {
		let filters = JSON.parse( localStorage.getItem( 'filters' ) );
		if ( !filters ) {
			filters = {
				card: {
					display: true,
					vowel: true,
					consonant: true
				},
				line: {
					display: true,
					vowel: true,
					consonant: true
				},
				text: {
					display: true,
					color: true
				}
			};
		}

		const editor = this.editor;
		const t = editor.t;

		// The "simpleBox" button must be registered among the UI components of the editor
		// to be displayed in the toolbar.
		editor.ui.componentFactory.add( 'aloeMagic', locale => {
			// The state of the button will be bound to the widget command.
			const command = editor.commands.get( 'insertAloeMagic' );

			// The button will be an instance of ButtonView.
			// const buttonView = new ButtonView( locale );
			const dropdownView = createDropdown( locale, SplitButtonView );

			dropdownView.buttonView.set( {
				// The t() function helps localize the editor. All strings enclosed in t() can be
				// translated and change when the language of the editor changes.
				label: t( 'Aloe Magic' ),
				withText: true,
				tooltip: true
			} );

			const buttons = [];
			const source = [
				{ filter: 'card', action: 'display', name: 'CARTES' },
				{ filter: 'card', action: 'consonant', name: '| Consonnes' },
				{ filter: 'card', action: 'vowel', name: '| Voyelles' },
				{ filter: 'line', action: 'display', name: 'LIGNES' },
				{ filter: 'line', action: 'consonant', name: '| Consonnes' },
				{ filter: 'line', action: 'vowel', name: '| Voyelles' },
				{ filter: 'text', action: 'display', name: 'TEXTES' },
				{ filter: 'text', action: 'color', name: '| Couleurs' }
			];

			source.forEach( item => {
				const button = new SwitchButtonView();
				button.set( {
					label: item.name,
					tooltip: false,
					withText: true,
					isToggleable: true,
					isOn: filters[ item.filter ][ item.action ]
				} );
				button.on( 'execute', event => {
					const newValue = !filters[ item.filter ][ item.action ];
					filters[ item.filter ][ item.action ] = newValue;
					// eslint-disable-next-line no-undef
					localStorage.setItem( 'filters', JSON.stringify( filters ) );
					event.source.isOn = newValue;
				} );
				buttons.push( button );
			} );

			addToolbarToDropdown( dropdownView, buttons );
			dropdownView.toolbarView.isVertical = true;

			// Bind the state of the button to the command.
			dropdownView.bind( 'isOn', 'isEnabled' ).to( command, 'value', 'isEnabled' );

			// Execute the command when the button is clicked (executed).
			this.listenTo( dropdownView.buttonView, 'execute', () => editor.execute( 'insertAloeMagic' ) );

			return dropdownView;
		} );
	}
}
