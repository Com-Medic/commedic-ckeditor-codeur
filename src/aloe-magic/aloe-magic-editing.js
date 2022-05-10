import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import {Widget} from "@ckeditor/ckeditor5-widget";
import { toWidget, toWidgetEditable } from '@ckeditor/ckeditor5-widget/src/utils';
import InsertAloeMagicCommand from "./insert-aloe-magic-command";

export default class AloeMagicEditing extends Plugin {

	static get requires() {                                                    // ADDED
		return [ Widget ];
	}

	init() {
		this._defineSchema();
		this._defineConverters();

		this.editor.commands.add( 'insertAloeMagic', new InsertAloeMagicCommand( this.editor ) );
	}

	_defineSchema() {
		const schema = this.editor.model.schema;

		schema.register( 'aloeMagic', {
			isObject: true,
			isBlock: true,
			allowWhere: '$block',
			allowContentOf: '$root',
			allowAttributes: [ 'class', 'data-json', 'contenteditable', 'id', 'data-filters' ],
		} );
	}

	_defineConverters() {
		const conversion = this.editor.conversion;

		conversion.for( 'upcast' ).elementToElement( {
			model: 'aloeMagic',
			view: 'aloe-magic'
		} );
		conversion.for( 'dataDowncast' ).elementToElement( {
			model: 'aloeMagic',
			view: 'aloe-magic'
		} );
		conversion.for( 'editingDowncast' ).elementToElement( {
			model: 'aloeMagic',
			view: ( modelElement, { writer: viewWriter } ) => {
				const section = viewWriter.createContainerElement( 'aloe-magic' );
				return toWidget( section, viewWriter );
			}
		} );

		conversion.attributeToAttribute( { model: 'data-json', view: 'data-json' } );
		conversion.attributeToAttribute( { model: 'contenteditable', view: 'contenteditable' } );
		conversion.attributeToAttribute( { model: 'id', view: 'id' } );
		conversion.attributeToAttribute( { model: 'data-filters', view: 'data-filters' } );
	}
}
