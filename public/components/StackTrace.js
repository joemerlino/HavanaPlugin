class StackTrace {
    constructor() {
        this.traces = [];
    }

    addTrace(trace) {
        this.traces.push(trace);
    }

    getTraces() {
        return this.traces;
    }
}

module.exports = StackTrace;
