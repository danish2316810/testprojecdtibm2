using MyService as service from '../../srv/catalogsService/customers-srv';

annotate service.CUST with @(
    UI.FieldGroup #GeneratedGroup : {
        $Type : 'UI.FieldGroupType',
        Data : [
            {
                $Type : 'UI.DataField',
                Value : CUSTOMER_NAME,
            },
            {
                $Type : 'UI.DataField',
                Value : CURRENCY,
            },
            {
                $Type : 'UI.DataField',
                Value : COUNTRY,
            },
        ],
    },
    UI.Facets : [
        {
            $Type : 'UI.ReferenceFacet',
            ID : 'GeneratedFacet1',
            Target : '@UI.FieldGroup#GeneratedGroup',
        },
    ],
    UI.LineItem : [
        {
            $Type : 'UI.DataField',
            Value : CUSTOMER_NAME,
        },
        {
            $Type : 'UI.DataField',
            Value : CURRENCY,
        },
        {
            $Type : 'UI.DataField',
            Value : COUNTRY,
        },
    ],
);


// Labels defined separately using @Common.Label


annotate service.CUST with {
    CUSTOMER_NAME 
    @Common  : {
         Label:   '{@i18n>CUSTOMER_NAME}'
    };
    CURRENCY     
     @Common :{
        Label : '{@i18n>CURRENCY}'
        };
    COUNTRY
    @Common : {
        Label : '{@i18n>COUNTRY}'
        };
};

