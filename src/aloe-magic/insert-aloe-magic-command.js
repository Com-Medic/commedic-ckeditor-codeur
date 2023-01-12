import Command from '@ckeditor/ckeditor5-core/src/command';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import params from "./params";

export default class InsertAloeMagicCommand extends Command {

	cardFilterTitle = '• Filtre Cartes activé';
	lineFilterTitle = '• Filtre Ligne activé'
	textFilterTitle = '• Filtre Texte activé';

	async execute() {
		const selection = this.editor.model.document.selection;
		const range = selection.getFirstRange();
		let textInput = '';
		let textArray = Array();
		for ( const item of range.getItems() ) {
			if ( item.is( 'textProxy' )) {
				if(!item.data.includes(this.cardFilterTitle) && !item.data.includes(this.lineFilterTitle) && !item.data.includes(this.textFilterTitle)){
					textInput += item.data + ' ';
					textArray.push(item.data);
				}
			}
		}
		console.log(textArray);
		for await (let textArrayItem of textArray){
			// textArrayItem = textArrayItem.slice( 0, -1 );
			if(textArrayItem.charAt(0) === ' '){
				textArrayItem = textArrayItem.substring(1, textArrayItem.length);
			}
			textArrayItem = textArrayItem.replace( /[\n\r]/g, ' ' );
			textArrayItem = textArrayItem.replace( '’', '\'' );
			let splitTextArrayItem = textArrayItem.match(/[^\.!\?]+[\.!\?]+/g);
			if(splitTextArrayItem === null){
				splitTextArrayItem = Array();
				splitTextArrayItem[0] = textArrayItem;
			}
			splitTextArrayItem.forEach( item => {
				textArrayItem = textArrayItem.replace(item,'');
			})
			splitTextArrayItem[splitTextArrayItem.length] = textArrayItem;
			for await (let text of splitTextArrayItem){
				if(text !== ''){
					let filteredText = this.filterText(text);
					await axios.get(params.endpoint, {
						params: { text : filteredText },
						headers: {'Content-Type': 'application/json'}
					}).then((response) => {
						this.editor.model.change(writer => {
							let aloeMagic = "";
							const filters = JSON.parse(localStorage.getItem('filters'));
							const filtersJson = window.btoa(unescape(encodeURIComponent(JSON.stringify(filters))));
							const id = uuidv4();
							response.data.sentence.source = text;
							const data = JSON.stringify(response.data);
							const dataJson = window.btoa(unescape(encodeURIComponent(data)));
							aloeMagic = writer.createElement('aloeMagic', {
								id: id,
								'data-json': dataJson,
								'data-filters': filtersJson,
								contenteditable: false
							});
							const textView = writer.createElement('paragraph')
							writer.appendText(text, textView);
							writer.append(textView, aloeMagic);

							let p;
							if(filters.card.display){
								p = writer.createElement('paragraph')
								writer.appendText(this.cardFilterTitle, p);

								if(filters.card.vowel){
									writer.appendText(' | Voyelles', p);
								}
								if(filters.card.consonant){
									writer.appendText(' | Consonnes', p);
								}

								writer.append(p, aloeMagic);
							}


							if(filters.line.display){
								p = writer.createElement('paragraph')
								writer.appendText(this.lineFilterTitle, p);

								if(filters.line.vowel){
									writer.appendText(' | Voyelles', p);
								}
								if(filters.line.consonant){
									writer.appendText(' | Consonnes', p);
								}

								writer.append(p, aloeMagic);
							}

							if(filters.text.display){
								p = writer.createElement('paragraph')
								writer.appendText(this.textFilterTitle, p);

								if(filters.text.color){
									writer.appendText(' | Couleurs', p);
								}
								if(filters.text.script){
									writer.appendText(' | Script', p);
								}
								if(!filters.text.script){
									writer.appendText(' | Cursif', p);
								}

								writer.append(p, aloeMagic);
							}
							this.editor.model.insertContent(aloeMagic,  this.editor.model.document.selection.getFirstPosition() );
						});
					}).catch(err => {
						console.error(err);
					});
				}
			}

		}

		/*textInput = textInput.slice( 0, -1 );
		textInput = textInput.replace( /[\n\r]/g, ' ' );
		textInput = textInput.replace( '’', '\'' );
		let splitText = textInput.match(/[^\.!\?]+[\.!\?]+/g);*/

		// splitText = splitText.reverse();
		/*for await (let text of splitText){
			await axios.get(params.endpoint, {
				params: { text },
				headers: {'Content-Type': 'application/json'}
			}).then((response) => {
				this.editor.model.change(writer => {
					let aloeMagic = "";
					const filters = JSON.parse(localStorage.getItem('filters'));
					const filtersJson = window.btoa(unescape(encodeURIComponent(JSON.stringify(filters))));
					const id = uuidv4();
					const data = JSON.stringify(response.data);
					const dataJson = window.btoa(unescape(encodeURIComponent(data)));
					aloeMagic = writer.createElement('aloeMagic', {
						id: id,
						'data-json': dataJson,
						'data-filters': filtersJson,
						contenteditable: false
					});
					const textView = writer.createElement('paragraph')
					writer.appendText(text, textView);
					writer.append(textView, aloeMagic);

					let p;
					if(filters.card.display){
						p = writer.createElement('paragraph')
						writer.appendText(this.cardFilterTitle, p);

						if(filters.card.vowel){
							writer.appendText(' | Voyelles', p);
						}
						if(filters.card.consonant){
							writer.appendText(' | Consonnes', p);
						}

						writer.append(p, aloeMagic);
					}


					if(filters.line.display){
						p = writer.createElement('paragraph')
						writer.appendText(this.lineFilterTitle, p);

						if(filters.line.vowel){
							writer.appendText(' | Voyelles', p);
						}
						if(filters.line.consonant){
							writer.appendText(' | Consonnes', p);
						}

						writer.append(p, aloeMagic);
					}

					if(filters.text.display){
						p = writer.createElement('paragraph')
						writer.appendText(this.textFilterTitle, p);

						if(filters.text.color){
							writer.appendText(' | Couleurs', p);
						}
						if(filters.text.script){
							writer.appendText(' | Script', p);
						}
						if(!filters.text.script){
							writer.appendText(' | Cursif', p);
						}

						writer.append(p, aloeMagic);
					}
					this.editor.model.insertContent(aloeMagic,  this.editor.model.document.selection.getFirstPosition() );
				});
			}).catch(err => {
				console.error(err);
			});
		}*/

		/*if(textInput !== '') {
			axios.get(params.endpoint, {
				params: { text: textInput },
				headers: {'Content-Type': 'application/json'}
			}).then((response) => {
				this.editor.model.change(writer => {
					let aloeMagic = "";
					const filters = JSON.parse(localStorage.getItem('filters'));
					const filtersJson = window.btoa(unescape(encodeURIComponent(JSON.stringify(filters))));
					const id = uuidv4();
					const data = JSON.stringify(response.data);
					const dataJson = window.btoa(unescape(encodeURIComponent(data)));
					aloeMagic = writer.createElement('aloeMagic', {
						id: id,
						'data-json': dataJson,
						'data-filters': filtersJson,
						contenteditable: false
					});
					const textView = writer.createElement('paragraph')
					writer.appendText(textInput, textView);
					writer.append(textView, aloeMagic);

					let p;
					if(filters.card.display){
						p = writer.createElement('paragraph')
						writer.appendText(this.cardFilterTitle, p);

						if(filters.card.vowel){
							writer.appendText(' | Voyelles', p);
						}
						if(filters.card.consonant){
							writer.appendText(' | Consonnes', p);
						}

						writer.append(p, aloeMagic);
					}


					if(filters.line.display){
						p = writer.createElement('paragraph')
						writer.appendText(this.lineFilterTitle, p);

						if(filters.line.vowel){
							writer.appendText(' | Voyelles', p);
						}
						if(filters.line.consonant){
							writer.appendText(' | Consonnes', p);
						}

						writer.append(p, aloeMagic);
					}

					if(filters.text.display){
						p = writer.createElement('paragraph')
						writer.appendText(this.textFilterTitle, p);

						if(filters.text.color){
							writer.appendText(' | Couleurs', p);
						}
						if(filters.text.script){
							writer.appendText(' | Script', p);
						}
						if(!filters.text.script){
							writer.appendText(' | Cursif', p);
						}

						writer.append(p, aloeMagic);
					}

					this.editor.model.insertContent(aloeMagic);
				});
			}).catch(err => {
				console.error(err);
			});
		}*/
	}

	refresh() {
		const model = this.editor.model;
		const selection = model.document.selection;
		const allowedIn = model.schema.findAllowedParent( selection.getFirstPosition(), 'aloeMagic' );

		this.isEnabled = allowedIn !== null;
	}

	filterText(text) {
		// Simple replacement
		const charToReplace = ['(',')','«','»']
		charToReplace.forEach(char => {
			text = text.replace(char,'');
		})

		// Replacement with whitespace
		const charToReplaceWithspace = ['/']
		charToReplaceWithspace.forEach(char => {
			text = text.replace(char,' ');
		})

		text = text.replace('  ',' ');
		return text;
	}
}
