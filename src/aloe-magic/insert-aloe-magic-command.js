import Command from '@ckeditor/ckeditor5-core/src/command';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import params from "./params";

export default class InsertAloeMagicCommand extends Command {

	execute() {
		const selection = this.editor.model.document.selection;
		const range = selection.getFirstRange();
		let text = '';
		for ( const item of range.getItems() ) {
			if ( item.is( 'textProxy' ) ) {
				text += item.data + ' ';
			}
		}
		text = text.slice( 0, -1 );
		text = text.replace( /[\n\r]/g, ' ' );
		text = text.replace( '’', '\'' );
		if(text !== '') {
			axios.get(params.endpoint, {
				params: {text},
				headers: {'Content-Type': 'application/json'}
			}).then((response) => {
				this.editor.model.change(writer => {
					let aloeMagic = "";
					const filters = JSON.stringify(JSON.parse(localStorage.getItem('filters')));
					const filtersJson = window.btoa(unescape(encodeURIComponent(filters)))
					const id = uuidv4();
					const data = JSON.stringify(response.data);
					const dataJson = window.btoa(unescape(encodeURIComponent(data)));
					aloeMagic = writer.createElement('aloeMagic', {
						id: id,
						'data-json': dataJson,
						'data-filters': filtersJson,
						contenteditable: false
					});
					writer.appendText(text, aloeMagic);
					this.editor.model.insertContent(aloeMagic);
				});
			}).catch(err => {
				console.error(err);
			});
		}
	}

	refresh() {
		const model = this.editor.model;
		const selection = model.document.selection;
		const allowedIn = model.schema.findAllowedParent( selection.getFirstPosition(), 'aloeMagic' );

		this.isEnabled = allowedIn !== null;
	}
}
