package com.clockapp;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.widget.Toast;

public class BootCompletedReceiver extends BroadcastReceiver {
    @Override
    public void onReceive(Context context, Intent intent) {
        if (Intent.ACTION_BOOT_COMPLETED.equals(intent.getAction())) {
            // Cihaz yeniden başlatıldığında servisi başlat
            Intent serviceIntent = new Intent(context, MyBackgroundService.class);
            context.startService(serviceIntent);
            Toast.makeText(context, "Service Started After Boot", Toast.LENGTH_LONG).show();
        }
    }
}

