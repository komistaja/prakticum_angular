import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'orderBy'
})

export class OrderByPipe implements PipeTransform {
    transform(array: Array<any>, args: string) {
        let byVal = 1;
        if (!array[0]) {
            return array;
        }
        if (args.charAt(0) === '!') {
            byVal = -1;
        }

        if (args === 'date' || args === '!date') {
            array.sort((a: any, b: any) => {
                if (a.date < b.date) {
                    return -1 * byVal;
                } else if (a.date > b.date) {
                    return 1 * byVal;
                } else {
                    return 0;
                }
            });
        }

        if (args === 'id' || args === '!id') {
            array.sort((a: any, b: any) => {
                if (parseInt(a.id, 10) < parseInt(b.id, 10)) {
                    return -1 * byVal;
                } else if (parseInt(a.id, 10) > parseInt(b.id, 10)) {
                    return 1 * byVal;
                } else {
                    return 0;
                }
            });
        }
    return array;
    }
}
