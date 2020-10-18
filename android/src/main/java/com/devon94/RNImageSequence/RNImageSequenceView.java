package com.devon94.RNImageSequence;

import android.content.Context;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.graphics.drawable.AnimationDrawable;
import android.graphics.drawable.BitmapDrawable;
import android.util.Log;
import android.os.AsyncTask;
import android.widget.ImageView;

import java.io.IOException;
import java.io.InputStream;
import java.net.URL;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.concurrent.*;
import java.lang.Thread;

public class RNImageSequenceView extends ImageView {
    private Integer framesPerSecond = 30;
    private Integer startFrame = 0;
    private Integer loopFrom = 0;
    private Integer loopTo = 0;
    private Boolean loop = true;
    private Boolean hasLoopInfo = false;
    private ArrayList<AsyncTask> activeTasks;
    private HashMap<Integer, Bitmap> bitmaps;
    private RNResourceDrawableIdHelper resourceDrawableIdHelper;
    private static final String TAG = "RNImageSequenceView";

    public RNImageSequenceView(Context context) {
        super(context);

        resourceDrawableIdHelper = new RNResourceDrawableIdHelper();
    }

    private class DownloadImageTask extends AsyncTask<String, Void, Bitmap> {
        private final Integer index;
        private final String uri;
        private final Context context;

        public DownloadImageTask(Integer index, String uri, Context context) {
            this.index = index;
            this.uri = uri;
            this.context = context;
        }

        @Override
        protected Bitmap doInBackground(String... params) {
            if (this.uri.startsWith("http")) {
                return this.loadBitmapByExternalURL(this.uri);
            }

            return this.loadBitmapByLocalResource(this.uri);
        }

        private Bitmap loadBitmapByLocalResource(String uri) {
            return BitmapFactory.decodeResource(this.context.getResources(),
                    resourceDrawableIdHelper.getResourceDrawableId(this.context, uri));
        }

        private Bitmap loadBitmapByExternalURL(String uri) {
            Bitmap bitmap = null;

            try {
                InputStream in = new URL(uri).openStream();
                bitmap = BitmapFactory.decodeStream(in);
            } catch (IOException e) {
                e.printStackTrace();
            }

            return bitmap;
        }

        @Override
        protected void onPostExecute(Bitmap bitmap) {
            if (!isCancelled()) {
                onTaskCompleted(this, index, bitmap);
            }
        }
    }

    private void onTaskCompleted(DownloadImageTask downloadImageTask, Integer index, Bitmap bitmap) {
        if (index == 0) {
            // first image should be displayed as soon as possible.
            this.setImageBitmap(bitmap);
        }

        bitmaps.put(index, bitmap);
        activeTasks.remove(downloadImageTask);

        if (activeTasks.isEmpty()) {
            setupAnimationDrawable();
        }
    }

    public void setImages(ArrayList<String> uris) {
        if (isLoading()) {
            // cancel ongoing tasks (if still loading previous images)
            for (int index = 0; index < activeTasks.size(); index++) {
                activeTasks.get(index).cancel(true);
            }
        }


        ThreadPoolExecutor defaultExecutor = (ThreadPoolExecutor) AsyncTask.THREAD_POOL_EXECUTOR;
        ThreadPoolExecutor threadPoolExecutor = new ThreadPoolExecutor(
                defaultExecutor.getCorePoolSize(),
                defaultExecutor.getMaximumPoolSize(),
                defaultExecutor.getKeepAliveTime(TimeUnit.MILLISECONDS),
                TimeUnit.MILLISECONDS,
                new LinkedBlockingQueue<Runnable>()
        );

        activeTasks = new ArrayList<>(uris.size());
        bitmaps = new HashMap<>(uris.size());

        for (int index = 0; index < uris.size(); index++) {

            DownloadImageTask task = new DownloadImageTask(index, uris.get(index), getContext());
            activeTasks.add(task);

            try {
                task.executeOnExecutor(threadPoolExecutor);
            } catch (RejectedExecutionException e) {
                Log.e("RNImageSequence", "DownloadImageTask failed: " + e.getMessage());
            }
        }

        threadPoolExecutor.shutdown();
    }

    public void setHasLoopInfo(Boolean hasLoopInfo) {
        this.hasLoopInfo = hasLoopInfo;

        if (isLoaded()) {
            setupAnimationDrawable();
        }
    }

    public void setStartFrame(Integer startFrame) {
        this.startFrame = startFrame;

        // updating frames per second, results in building a new AnimationDrawable
        // (because we cant alter frame duration)
        if (isLoaded()) {
            setupAnimationDrawable();
        }
    }

    public void setLoopFrom(Integer loopFrom) {
        this.loopFrom = loopFrom;

        // updating frames per second, results in building a new AnimationDrawable
        // (because we cant alter frame duration)
        if (isLoaded()) {
            setupAnimationDrawable();
        }
    }

    public void setLoopTo(Integer loopTo) {
        this.loopTo = loopTo;

        // updating frames per second, results in building a new AnimationDrawable
        // (because we cant alter frame duration)
        if (isLoaded()) {
            setupAnimationDrawable();
        }
    }

    public void setFramesPerSecond(Integer framesPerSecond) {
        this.framesPerSecond = framesPerSecond;

        // updating frames per second, results in building a new AnimationDrawable
        // (because we cant alter frame duration)
        if (isLoaded()) {
            setupAnimationDrawable();
        }
    }

    public void setLoop(Boolean loop) {
        this.loop = loop;

        // updating looping, results in building a new AnimationDrawable
        if (isLoaded()) {
            setupAnimationDrawable();
        }
    }

    private boolean isLoaded() {
        return !isLoading() && bitmaps != null && !bitmaps.isEmpty();
    }

    private boolean isLoading() {
        return activeTasks != null && !activeTasks.isEmpty();
    }

    private void setDrawable(AnimationDrawable drawable) {
        this.setImageDrawable(drawable);
    }

    private void setupAnimationDrawable() {
        if (this.hasLoopInfo) {
            final AnimationDrawable initialAnimationDrawable = new AnimationDrawable();
            final AnimationDrawable loopAnimationDrawable = new AnimationDrawable();

            for (int index = this.startFrame; index <= this.loopTo; index++) {
                BitmapDrawable drawable = new BitmapDrawable(this.getResources(), bitmaps.get(index));
                initialAnimationDrawable.addFrame(drawable, 1000 / framesPerSecond);
            }

            for (int index = this.loopFrom; index <= this.loopTo; index++) {
                BitmapDrawable drawable = new BitmapDrawable(this.getResources(), bitmaps.get(index));
                loopAnimationDrawable.addFrame(drawable, 1000 / framesPerSecond);
            }


            final Integer newLoop = this.loopFrom;

            CustomAnimationDrawable cad = new CustomAnimationDrawable(initialAnimationDrawable) {
                @Override
                public void onAnimationStart() {
                    // Animation has started...
                }

                @Override
                public void onAnimationFinish() {
                    initialAnimationDrawable.stop();
                    setDrawable(loopAnimationDrawable);
                    loopAnimationDrawable.start();
                }

            };

            cad.setOneShot(!this.loop);
            setDrawable(cad);
            cad.start();
        } else {
            final AnimationDrawable initialAnimationDrawable = new AnimationDrawable();

            for (int index = 0; index < bitmaps.size(); index++) {
                BitmapDrawable drawable = new BitmapDrawable(this.getResources(), bitmaps.get(index));
                initialAnimationDrawable.addFrame(drawable, 1000 / framesPerSecond);
            }


            CustomAnimationDrawable cad = new CustomAnimationDrawable(initialAnimationDrawable) {
                @Override
                public void onAnimationStart() {
                }

                @Override
                public void onAnimationFinish() {
                }

            };

            cad.setOneShot(!this.loop);
            this.setImageDrawable(cad);
            cad.start();
        }

    }
}