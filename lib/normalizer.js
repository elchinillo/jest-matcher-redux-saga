import { SKIP_TOKEN, STEP_TOKEN, step } from './utils';

function* normalize(values) {
    for (let i = 0 ; i < values.length ; i++) {
        const value = values[i];

        switch(value.type) {
            case SKIP_TOKEN:
                for (let j = 0, n = value.steps ; j < n ; j++) {
                    yield step(value.inputs[j]);
                }

                break;
            case STEP_TOKEN:
                yield value;

                break;

            default:
                yield step(undefined, value);
        }
    }
}

export default normalize;
