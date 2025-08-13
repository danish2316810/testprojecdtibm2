sap.ui.require(
    [
        'sap/fe/test/JourneyRunner',
        'app/dan/testfiori/test/integration/FirstJourney',
		'app/dan/testfiori/test/integration/pages/ContractErrorsViewList',
		'app/dan/testfiori/test/integration/pages/ContractErrorsViewObjectPage'
    ],
    function(JourneyRunner, opaJourney, ContractErrorsViewList, ContractErrorsViewObjectPage) {
        'use strict';
        var JourneyRunner = new JourneyRunner({
            // start index.html in web folder
            launchUrl: sap.ui.require.toUrl('app/dan/testfiori') + '/index.html'
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