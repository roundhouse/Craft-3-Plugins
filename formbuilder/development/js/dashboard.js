let DashboardChart

DashboardChart = Garnish.Base.extend({

    init() {
        console.log('hello')
    }
})

Garnish.$doc.ready(() => {
    new DashboardChart('new')
})