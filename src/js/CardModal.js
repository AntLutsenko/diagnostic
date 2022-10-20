import { Modal } from "./_modal";

export class CardModal extends Modal {
	constructor() {
		super();
	}

	renderModalWrapper(btn) {
		super.renderModalWrapper();
		this.modalWrapper.innerHTML = `
        <div class="modal-dialog">
           <form class="modal-content">
                <span class="eror-message hiden">You need to choose a doctor</span>
                <div class="visit-form__header">
                    <h5 class="visit-form__modal-title">Enter information for a visit to the doctor</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="mb-3">
                    <textarea
                        data-name="title" placeholder="title"
                        class="form-control formInput"
                        id="exampleFormControlTextarea1"
                        ></textarea>
                    <select class="form-select specialist formInput" aria-label="Default select example" data-name="specialist" >
                        <option selected >specialist</option>
                        <option value="cardiologist"  >cardiologist</option>
                        <option value="dentist" >dentist</option>
                        <option value="therapist" >therapist</option>
                    </select>
        
                    <select class="form-select priority formInput" aria-label="Default select example" data-name="priority">
                    <option selected >priority</option>
                    <option value="low" >low</option>
                    <option value="midle" >midle</option>
                    <option value="high" >high</option>
                    </select>
                </div>
                <div class="mb-3">
                    <textarea
                        data-name="lastName"
                        class="form-control formInput" placeholder="lastName"
                        id="exampleFormControlTextarea1"
                        rows="1"></textarea>
                    <textarea
                        data-name="firstName" placeholder="firstName"
                        class="form-control formInput"
                        id="exampleFormControlTextarea1"
                        rows="1"></textarea>
                </div>
                <div class="mb-3">
                    <textarea
                        data-name="description" placeholder="description"
                        class="form-control formInput"
                        id="exampleFormControlTextarea1"
                        rows="3"
                    ></textarea>
                    <textarea
                        data-name="comments" placeholder="comments"
                        class="form-control formInput"
                        id="exampleFormControlTextarea1"
                        rows="3"
                    ></textarea>
                    <div class="extra-field"></div>
                    
                    <button class="btn btn-primary btn-form create-vicit" type="submit">
                        ${btn}
                    </button>
                </div>
            </form>
        </div>`;

		this.attachListener();
	}

	attachListener() {
		this.modalWrapper.addEventListener("click", function (e) {
			if (e.target.classList.contains("modal-wrapper")) {
				Modal.removeModal();
			}
		});

		const close = document.querySelector(`[aria-label="Close"]`);
		close.addEventListener("click", Modal.removeModal);

		this.choseDoctor = document.querySelector(".specialist");

		this.choseDoctor.addEventListener("change", this.selectSpecialist);
	}
	selectSpecialist() {
		this.choseDoctor = document.querySelector(".specialist");
		const container = document.querySelector(".extra-field");
		if (this.choseDoctor.value === "cardiologist") {
			container.innerHTML = `
                <input
                    data-name="normalPressure"
                    class="form-control normalPressure formInput"
                    id="exampleFormControlTextarea1" 
                    placeholder="normalPressure">
                
                <input
                    data-name="pastDiseases"
                    class="form-control pastDiseases formInput"
                    id="exampleFormControlTextarea1" placeholder="pastDiseases">
                <input
                    data-name="age"
                    class="form-control age formInput"
                    id="exampleFormControlTextarea1" placeholder="age">`;
		} else if (this.choseDoctor.value === "dentist") {
			container.innerHTML = `
                <input
                    data-name="lastVisit"
                    class="form-control lastVisit formInput"
                    id="exampleFormControlTextarea1" 
                    placeholder="lastVisit">`;
		} else if (this.choseDoctor.value === "therapist") {
			container.innerHTML = `
                <input
                    data-name="age"
                    class="form-control age formInput"
                    id="exampleFormControlTextarea1" 
                    placeholder="age">`;
		}
	}
}
