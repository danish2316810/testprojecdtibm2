using ErrorMangement as service from '../../srv/catalogsService/errorManage-service';
annotate service.ContractErrorsView with @(
    UI.SelectionFields : [
        terminalNo,
        folioMo,
       
    ],
    UI.FieldGroup #GeneratedGroup : {
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
                Label : 'lastRetry',
                Value : lastRetry,
            },
            {
                $Type : 'UI.DataField',
                Label : 'reprocessCount',
                Value : reprocessCount,
            },
            {
                $Type : 'UI.DataField',
                Label : 'errorCode',
                Value : errorCode,
            },
            {
                $Type : 'UI.DataField',
                Label : 'errorDesc',
                Value : errorDesc,
            },
            {
                $Type : 'UI.DataField',
                Label : 'errorEnabledForReprocessing',
                Value : errorEnabledForReprocessing,
            },
            {
                $Type : 'UI.DataField',
                Label : 'sourceSystem',
                Value : sourceSystem,
            },
            {
                $Type : 'UI.DataField',
                Label : 'enabledForReprocessing',
                Value : enabledForReprocessing,
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
    UI.Facets : [
        {
            $Type : 'UI.ReferenceFacet',
            ID : 'GeneratedFacet1',
            Label : 'General Information',
            Target : '@UI.FieldGroup#GeneratedGroup',
        },
    ],
    UI.LineItem : [
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

