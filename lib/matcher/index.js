import toYieldAll from './toYieldAll';

function toYield() {
    if (this.isNot) {
        throw new Error('.not. is not supported');
    }

    return toYieldAll.apply(this, arguments);
}

export default toYield;
