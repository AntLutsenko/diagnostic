import {DoctorAPIService} from "./_DoctorAPIService";
import {Desk} from "./Desk";

export class Search {
    constructor(formClass, keyPriority, keySpecialist) {
        this.formClass = formClass;
        this.keyPriority = keyPriority;
        this.keySpecialist = keySpecialist;
        this.formNode = document.querySelector(`.${this.formClass}`);
        this.attachListener();
    }

    attachListener() {
        this.formNode.addEventListener('submit', (event) => {
            event.preventDefault();
        })
        this.formNode.addEventListener('submit', this.findCards.bind(this))
    }

    async findCards() {
        let cardArr = await DoctorAPIService.getAllCards();
        const sentence = this.formNode.querySelector('.filter-input').value.toLowerCase();
        const filterPriority = this.formNode.querySelectorAll('select')[0].value;
        const filterDoctor = this.formNode.querySelectorAll('select')[1].value;

        if (sentence) {
            console.log('test')
            cardArr = cardArr.filter((card) => {
                return card.title.toLowerCase().includes(sentence) || card.description.toLowerCase().includes(sentence);
            })
        }

        if (cardArr && filterPriority !== this.keyPriority) {
            cardArr = cardArr.filter((card) => {
                return card.priority.toLowerCase() === filterPriority.toLowerCase();
            })
        }

        if (cardArr && filterDoctor !== this.keySpecialist) {
            cardArr = cardArr.filter((card) => {
                return card.specialist.toLowerCase() === filterDoctor.toLowerCase();
            })

        }

        Desk.cleanDesk();
        Desk.drawVisitArr(cardArr ? cardArr : []);
    }

}