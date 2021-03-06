/*
 * Protocoder 
 * A prototyping platform for Android devices 
 * 
 * 
 * Copyright (C) 2013 Motorola Mobility LLC
 *
 * Permission is hereby granted, free of charge, to any person obtaining
 * a copy of this software and associated documentation files (the "Software"),
 * to deal in the Software without restriction, including without limitation
 * the rights to use, copy, modify, merge, publish, distribute, sublicense,
 * and/or sell copies of the Software, and to permit persons to whom the Software
 * is furnished to do so, subject to the following conditions: 
 * 
 * The above copyright notice and this permission notice shall be included in all 
 * copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR 
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN 
 * THE SOFTWARE.
 * 
 */

package org.protocoder.sensors;

import android.content.Context;
import android.hardware.Sensor;
import android.hardware.SensorEvent;
import android.hardware.SensorEventListener;

public class OrientationManager extends CustomSensorManager implements WhatIsRunningInterface {

    public interface OrientationListener extends CustomSensorListener {

	public void onOrientation(float pitch, float roll, float z);
    }

    public OrientationManager(Context c) {
	super(c);

	sensor = sensormanager.getDefaultSensor(Sensor.TYPE_ORIENTATION);

	listener = new SensorEventListener() {

	    @Override
	    public void onSensorChanged(SensorEvent event) {

		for (CustomSensorListener l : listeners) {
		    ((OrientationListener) l).onOrientation(event.values[0], event.values[1], event.values[2]);

		}
	    }

	    @Override
	    public void onAccuracyChanged(Sensor sensor, int accuracy) {

	    }
	};
    }

}
