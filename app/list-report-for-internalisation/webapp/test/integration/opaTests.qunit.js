sap.ui.require(
    [
        'sap/fe/test/JourneyRunner',
        'app/listreportforinternalisation/test/integration/FirstJourney',
		'app/listreportforinternalisation/test/integration/pages/CUSTList',
		'app/listreportforinternalisation/test/integration/pages/CUSTObjectPage'
    ],
    function(JourneyRunner, opaJourney, CUSTList, CUSTObjectPage) {
        'use strict';
        var JourneyRunner = new JourneyRunner({
            // start index.html in web folder
            launchUrl: sap.ui.require.toUrl('app/listreportforinternalisation') + '/index.html'
        });

       
        JourneyRunner.run(
            {
                pages: { 
					onTheCUSTList: CUSTList,
					onTheCUSTObjectPage: CUSTObjectPage
                }
            },
            opaJourney.run
        );
    }
);