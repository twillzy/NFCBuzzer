package com.tagmabutt;

import android.app.Activity;
import android.app.PendingIntent;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.nfc.NdefMessage;
import android.nfc.NfcAdapter;
import android.nfc.Tag;
import android.util.Log;
import android.widget.Toast;

import com.facebook.react.bridge.ActivityEventListener;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.LifecycleEventListener;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.uimanager.IllegalViewOperationException;

public class NFCModule extends ReactContextBaseJavaModule implements ActivityEventListener, LifecycleEventListener {
    private NFCManager nfcManager;
    private NdefMessage ndefMessage = null;
    Tag currentTag;

    public NFCModule(ReactApplicationContext reactContext, Activity activity) {
        super(reactContext);
        nfcManager = new NFCManager(activity);
        reactContext.addLifecycleEventListener(this);
        reactContext.addActivityEventListener(this);
    }

    @Override
    public String getName() {
        return "NFCModule";
    }

    @ReactMethod
    public void tagMaButt(Promise promise) {
        try {
            ndefMessage = nfcManager.createUriMessage("www.google.com/tagmabutt", "http://");

            WritableMap map = Arguments.createMap();
            map.putString("tagStatus", "tagged");
            promise.resolve(map);
        } catch (IllegalViewOperationException e) {
            promise.reject(e);
        }
    }

    @Override
    public void onActivityResult(Activity activity, int requestCode, int resultCode, Intent data) {

    }

    @Override
    public void onNewIntent(Intent intent) {
        Log.d("Nfc", "New intent");
        // It is the time to write the tag
        currentTag = intent.getParcelableExtra(NfcAdapter.EXTRA_TAG);
        if (ndefMessage != null) {
            nfcManager.writeTag(currentTag, ndefMessage);
        } else {

        }
    }

    @Override
    public void onHostResume() {
        try {
            nfcManager.verifyNFC();
            Context context = getReactApplicationContext();
            String pn = context.getApplicationContext().getPackageName();
            Intent nfcIntent = context.getPackageManager().getLaunchIntentForPackage(pn);
            nfcIntent.addFlags(Intent.FLAG_ACTIVITY_SINGLE_TOP);
            PendingIntent pendingIntent = PendingIntent.getActivity(context, 0, nfcIntent, 0);
            IntentFilter[] intentFiltersArray = new IntentFilter[] {};
            String[][] techList = new String[][] { { android.nfc.tech.Ndef.class.getName() }, { android.nfc.tech.NdefFormatable.class.getName() } };
            NfcAdapter nfcAdpt = NfcAdapter.getDefaultAdapter(context);
            nfcAdpt.enableForegroundDispatch(getCurrentActivity(), pendingIntent, intentFiltersArray, techList);
        }
        catch(NFCManager.NFCNotSupported nfcnsup) {
            Log.d("Nfc", "Not supported");
        }
        catch(NFCManager.NFCNotEnabled nfcnEn) {
            Log.d("NFC", "Not enabled");
        }
    }

    @Override
    public void onHostPause() {
        nfcManager.disableDispatch();

    }

    @Override
    public void onHostDestroy() {
    }
}
