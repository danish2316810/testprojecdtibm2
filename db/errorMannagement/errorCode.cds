namespace app.dan;

entity ErrorCodes{
    key errorCode              :String(3);
        errorDesc               :String(200);
        enabledForReprocessing  :Boolean;
    
}
