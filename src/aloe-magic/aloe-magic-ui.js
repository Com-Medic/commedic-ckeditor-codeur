
import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import imageIcon from './aloe.svg';
import {
	addToolbarToDropdown,
	createDropdown,
	SplitButtonView,
	SwitchButtonView
} from "@ckeditor/ckeditor5-ui";

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
					display: false,
					vowel: false,
					consonant: false
				},
				text: {
					display: true,
					color: true,
					script: true
				},
				colors : {
					color: false
				}
			};
			localStorage.setItem( 'filters', JSON.stringify( filters ) );
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
				label: 'Codeur',
				icon:imageIcon,
				tooltip: true
			} );

			const buttons = [];
			const source = [
				{ filter: 'card', action: 'display', name: 'Cartes', title: true },
				{ filter: 'card', action: 'consonant', name: 'Consonnes', title: false },
				{ filter: 'card', action: 'vowel', name: 'Voyelles', title: false },
				{ filter: 'line', action: 'display', name: 'Lignes', title: true },
				{ filter: 'line', action: 'consonant', name: 'Consonnes', title: false },
				{ filter: 'line', action: 'vowel', name: 'Voyelles', title: false },
				{ filter: 'text', action: 'display', name: 'Textes', title: true },
				{ filter: 'text', action: 'color', name: 'Couleurs', title: false },
				{ filter: 'text', action: 'script', name: 'Script', title: false },
				{ filter: 'colors', action: 'color', name: 'Monochromie', title: true }
			];

			let i = 0;

			source.forEach( item => {
				let btnClass = 'custom-toggle';
				if(item.title){
					btnClass += ' title';
				}else{
					btnClass += ' subtitle';
				}
				if(i !== 0 && item.title){
					btnClass += ' separator';
				}

				const button = new SwitchButtonView();
				button.set( {
					label: item.name,
					class: btnClass,
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
				i++;
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
