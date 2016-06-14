(function() {
    'use strict';

    describe('events service', function() {
        var EventsService;


        beforeEach(module('drinkme'));
        beforeEach(inject(function(_EventsService_) {
            EventsService = _EventsService_;
        }));
        beforeEach(function () {
            localStorage.setItem('events', []);
        })

        // it('should generate 10 triggers', function() {
        //     EventsService.loadData('14/06/2016');
        //     expect(EventsService.data.triggers.length).toEqual(10);
        // });

        it('should add an event', function() {
            EventsService.addEvent({
                id      : 1,
                name    : 'test' 
            });
            var events = JSON.parse(localStorage.getItem('events'));

            expect(events.length).toEqual(1);
        });

        it('should remove an event', function () {
            EventsService.addEvent({
                id      : 1,
                name    : 'test' 
            });
            EventsService.removeEvent({id : 1, name : 'test'});

            var events = JSON.parse(localStorage.getItem('events'));

            expect(events.length).toEqual(0);
        });

        it('should edit an event', function () {
            EventsService.addEvent({
                id      : 1,
                name    : 'test' 
            });
            EventsService.editEvent(1, {id : 1, name : 'test2'});

            var events = JSON.parse(localStorage.getItem('events'));

            expect(events[0].name).toEqual('test2');
        });

        it('should return all events', function() {
            EventsService.addEvent({
                id      : 1,
                name    : 'test' 
            });
            EventsService.addEvent({
                id      : 2,
                name    : 'test' 
            });

            var events = JSON.parse(localStorage.getItem('events'));

            expect(events.length).toEqual(2);
            expect(EventsService.data.events.length).toEqual(2);
        })
    });
})();
