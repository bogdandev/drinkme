(function() {
    'use strict';

    describe('events service', function() {
        var EventsService;

        beforeEach(module('drinkme'));
        beforeEach(inject(function(_EventsService_) {
            EventsService = _EventsService_;
        }));


        it('should generate 10 triggers', function() {
            EventsService.loadData('14/06/2016');
            expect(EventsService.data.triggers.length).toEqual(10);
        });
    });
})();
