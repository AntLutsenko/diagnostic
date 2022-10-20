import { DoctorAPIService } from "./_DoctorAPIService";
import {UpdateCardModal} from "./UpdateCardModal";

export class Visit {
	constructor(card) {
		this.card = card;
	}

	createCardList() {
		this.paramList = `<ul class="client-visit-card__list">`;
		for (const key in this.card) {
			if (key !== "id") {
				this.paramList += `<li class='client-visit-card__element'>${key}:${this.card[key]}</li>`;
			}
		}
		this.paramList += "</ul>";
		return this.paramList;
	}

	render() {
		const desk = document.querySelector(".desk");
		const list = this.createCardList();
		this.visitNode = document.createElement("div");
		this.visitNode.classList.add("client-visit-card")

		const { editBtn, deleteBtn } = this.createButtons();
		this.visitNode.insertAdjacentHTML("beforeend", list);
		this.visitNode.insertAdjacentElement("beforeend", editBtn);
		this.visitNode.insertAdjacentElement("beforeend", deleteBtn);
		desk.insertAdjacentElement("beforeend", this.visitNode);
	}
	update(){
		this.visitNode.firstChild.remove();
		this.visitNode.insertAdjacentHTML('afterbegin', this.createCardList());
	}

	createButtons() {
		const editBtn = document.createElement("button");
		editBtn.classList.add('client-visit-card__btn')
		const deleteBtn = document.createElement("button");
		deleteBtn.classList.add('client-visit-card__btn')
		editBtn.innerText = "edit";
		deleteBtn.innerText = "delete";
		deleteBtn.addEventListener("click", () => {

			DoctorAPIService.deleteCard(this.card.id);
			this.visitNode.remove();
			const deskCard = document.querySelector(".desk");
			const deskEmpty = document.querySelector(".desk__empty");
			if(deskCard.childElementCount === 0){
				deskEmpty.classList.remove('hiden')
			}
		});

		editBtn.addEventListener("click", ()=>{
			new UpdateCardModal(this)
		})

		return { editBtn, deleteBtn };
	}
}
