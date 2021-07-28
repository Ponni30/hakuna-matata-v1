import { Injectable } from '@angular/core';
import * as jsPDF from 'jspdf';
require('jspdf-autotable');

@Injectable()
export class PDFGenerator {
    constructor() {

    }

    generatPDFInTable(title, heading, data, fileName) {

        let doc: any = new jsPDF('l');
        doc.text(7, 15, title);

        doc.autoTable(heading, data, {
            startY: 30,
            theme: 'grid',
            margin: { horizontal: 7 },
            bodyStyles: { valign: 'top' },
            styles: { overflow: 'linebreak', columnWidth: 'auto' },
            columnStyles: { text: { columnWidth: 'auto' } }
        });
        doc.save(fileName + '.pdf');
    }
}
