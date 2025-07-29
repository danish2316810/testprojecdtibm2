sap.ui.require(
    [
        'sap/fe/test/JourneyRunner',
        'app/dan/appdancontracterrors/test/integration/FirstJourney',
		'app/dan/appdancontracterrors/test/integration/pages/ContractErrorsViewList',
		'app/dan/appdancontracterrors/test/integration/pages/ContractErrorsViewObjectPage'
    ],
    function(JourneyRunner, opaJourney, ContractErrorsViewList, ContractErrorsViewObjectPage) {
        'use strict';
        var JourneyRunner = new JourneyRunner({
            // start index.html in web folder
            launchUrl: sap.ui.require.toUrl('app/dan/appdancontracterrors') + '/index.html'
        });

       
        JourneyRunner.run(
            {
                pages: { 
					onTheContractErrorsViewList: ContractErrorsViewList,
					onTheContractErrorsViewObjectPage: ContractErrorsViewObjectPage
                }
            },
            opaJourney.run
        );
    }
);