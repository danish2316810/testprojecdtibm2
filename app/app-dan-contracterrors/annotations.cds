using ErrorMangement as service from '../../srv/catalogsService/errorManage-service';
annotate service.ContractErrorsView with @(
    UI.SelectionFields : [
        terminalNo,
        folioMo,
       
    ],
   

    UI.LineItem : [
        {
                $Type : 'UI.DataField',
                Label : 'sourceSystem',
                Value : sourceSystem,
            },
        {
            $Type : 'UI.DataField',
            Label : '{i18n>TerminalNo}',
            Value : terminalNo,
        },
        {
            $Type : 'UI.DataField',
            Label : 'folioMo',
            Value : folioMo,
        },
        {
            $Type : 'UI.DataField',
            Label : 'invNo',
            Value : invNo,
        },
        {
            $Type : 'UI.DataField',
            Label : 'lastRetry',
            Value : lastRetry,
        },
        {
            $Type : 'UI.DataField',
            Label : 'reprocessCount',
            Value : reprocessCount,
        },
    ],
);

annotate service.ContractErrorsView with {
    errorCode @UI.Hidden;
    errorDesc @UI.Hidden;
    errorEnabledForReprocessing @UI.Hidden;
};

// object page
annotate service.ContractErrorsView with @(UI:{
    HeaderInfo  : {
        
        TypeName : 'ContractError',
        TypeNamePlural : 'ContractErrors',
        Title:{$Type:'UI.DataField', Value:terminalNo}
    },
    Facets : [
        {
            $Type : 'UI.ReferenceFacet',
            ID : 'GeneratedFacet1',
            Label : 'General Information',
            Target : '@UI.FieldGroup#GeneratedGroup',
        },
    ],
     FieldGroup #GeneratedGroup : {
        $Type : 'UI.FieldGroupType',
        Data : [
            {
                $Type : 'UI.DataField',
                Label : 'terminalNo',
                Value : terminalNo,
            },
            {
                $Type : 'UI.DataField',
                Label : 'folioMo',
                Value : folioMo,
            },
            {
                $Type : 'UI.DataField',
                Label : 'invNo',
                Value : invNo,
            },
           
            {
                $Type : 'UI.DataField',
                Label : 'sourceSystem',
                Value : sourceSystem,
            },
           
            {
                $Type : 'UI.DataField',
                Label : 'httpErroMessage',
                Value : httpErroMessage,
            },
            {
                $Type : 'UI.DataField',
                Label : 'httpErrorCode',
                Value : httpErrorCode,
            },
            {
                $Type : 'UI.DataField',
                Label : 'interfaceEnabledForReprocessing',
                Value : interfaceEnabledForReprocessing,
            },
        ],
    },
    
   
},
);