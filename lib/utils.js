export const SKIP_TOKEN = '@@jest-matcher-redux-saga/SKIP';
export const STEP_TOKEN = '@@jest-matcher-redux-saga/STEP';

function _step(input, value, done = false) {
    const step = {
        type: STEP_TOKEN,
        input: input,
        output: {
            done: done
        }
    };

    if (arguments.length > 1) {
        step.output.value = value;
    }

    return step;
}

export function done(value, input) {
    return _step(input, value, true);
}

export function step(input, value) {
    return _step(input, value, false);
}

export function skip(steps = 1, inputs) {
    return {
        type: SKIP_TOKEN,
        steps: steps,
        inputs: Array.isArray(inputs) ? inputs : [inputs]
    };
}
