import diff from 'jest-diff';
import normalize from '../normalizer';

function toYieldAll(generator, values) {
    let counter = 0;
    let steps = normalize(values);

    let saga;

    while (true) {
        counter++;
        const step = steps.next();

        if (step.done) {
            return {
                pass: true
            };
        }

        const saga = generator.next(step.value.input);

        try {
            if (saga.value instanceof Promise) {
                expect(saga.value).resolves.toMatchObject(step.value.output.value);
            } else {
                expect(saga).toMatchObject(step.value.output);
            }
        } catch (e) {
            const expected = step.value.output;
            const received = saga;

            let errorMessage;
            if (saga.done) {
                errorMessage = 'Unexpected end of saga';
            } else {
                errorMessage = `Step #${counter}`;
            }

            const diffString = diff(expected, received, {
                expand: this.expand
            });

            return {
                message: () => (
`${this.utils.matcherHint('.toYield')}

${errorMessage}. Expected value to be:

${this.utils.printExpected(expected)}

Received:

${this.utils.printReceived(received)}

${diffString ? `Difference:\n\n${diffString}` : ''}
`
                ),
                pass: false
            };
        }
    }
}

export default toYieldAll;
