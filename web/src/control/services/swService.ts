﻿/// <reference path="../index.ts" />

module control {
    import ISwitch = sw.ISwitch;
    import Switch = sw.Switch;

    export class SwService {
        private http: ng.IHttpService;

        constructor($http) {
            this.http = $http;
        }

        list(callback?: (switches) => void): any[] {
            var sws = [];

            this.http.get('/sw')
                .success((res: any) => {
                    var err = res.err;
                    var data: any[] = res.data;

                    if (err) return console.error(err);

                    data.forEach((sw) => {
                        sws.push(new Switch(sw));
                    });

                    if (callback)
                        callback(sws);
                });

            return sws;
        }
    }

    registerService('swService', SwService);
}