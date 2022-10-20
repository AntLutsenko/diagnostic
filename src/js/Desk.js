import {DoctorAPIService} from "./_DoctorAPIService";
import {VisitDentist} from "./_VisitDentist";
import {VisitCardiologist} from "./_VisitCardiologist";
import {VisitTherapist} from "./_VisitTherapist";

export class Desk {
    constructor() {
    }

    static async drawAllCard() {
        this.drawVisitArr(await DoctorAPIService.getAllCards());
    }

    static async drawVisitArr(cards) {
        const emptyLabel = document.querySelector('.desk__empty')
        if (cards.length) {
            emptyLabel.classList.add('hiden')
            cards.forEach(card => {
                if (card.specialist.toLowerCase() === 'dentist') {
                    const visit = new VisitDentist(card/*, card.lastVisit*/)
                    return visit.render()
                } else if (card.specialist.toLowerCase() === 'cardiologist') {
                    const visit = new VisitCardiologist(card/*, card.pastDiseases, card.normalPressure, card.age*/)
                    return visit.render()
                } else if (card.specialist.toLowerCase() === 'therapist') {
                    const visit = new VisitTherapist(card/*, card.age*/)
                    return visit.render()
                }
            })
        } else {
            Desk.cleanDesk()
            emptyLabel.classList.remove('hiden');
        }
    }

    static cleanDesk() {
        const desk = document.querySelector('.desk')
        desk.innerHTML = ''
    }
}
