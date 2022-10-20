export class Modal {
	constructor() {}

	renderModalWrapper() {
		this.modalWrapper = document.createElement("div");
		this.modalWrapper.classList.add("modal-wrapper");
		document.body.append(this.modalWrapper);
	}

	static removeModal() {
		const modalWrapper = document.querySelector(".modal-wrapper");
		modalWrapper.remove();
	}
}
