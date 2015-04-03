package ch.bfh.anuto.game.objects;

import ch.bfh.anuto.game.GameObject;
import ch.bfh.anuto.game.TickTimer;

public abstract class AimingTower extends Tower implements GameObject.Listener {

    public enum Strategy {
        Closest,
        Weakest,
        Strongest
    }

    /*
    ------ Members ------
     */

    protected Enemy mTarget = null;
    protected Strategy mStrategy = Strategy.Closest;
    protected boolean mLockOnTarget = true;

    private TickTimer mNextTargetTimer;

    /*
    ------ Methods ------
     */

    @Override
    public void init() {
        super.init();
        mNextTargetTimer = TickTimer.createInterval(0.1f);
    }

    @Override
    public void clean() {
        super.clean();
        setTarget(null);
    }

    @Override
    public void tick() {
        super.tick();

        if (mNextTargetTimer.tick()) {
            if (mTarget != null && getDistanceTo(mTarget) > mRange) {
                onTargetLost();
            }

            if (mTarget == null || !mLockOnTarget) {
                nextTarget();
            }
        }
    }


    protected void setTarget(Enemy target) {
        if (mTarget != null) {
            mTarget.removeListener(this);
        }

        mTarget = target;

        if (mTarget != null) {
            mTarget.addListener(this);
        }
    }

    protected void nextTarget() {
        switch (mStrategy) {
            case Closest:
                setTarget(getEnemiesInRange().min(GameObject.distanceTo(mPosition)));
                break;

            case Strongest:
                setTarget(getEnemiesInRange().max(Enemy.health()));
                break;

            case Weakest:
                setTarget(getEnemiesInRange().min(Enemy.health()));
                break;
        }
     }

    protected void onTargetLost() {
        setTarget(null);
    }

    /*
    ------ GameObject Listener ------
     */

    @Override
    public void onObjectAdded(GameObject obj) {
    }

    @Override
    public void onObjectRemoved(GameObject obj) {
        onTargetLost();
    }
}
