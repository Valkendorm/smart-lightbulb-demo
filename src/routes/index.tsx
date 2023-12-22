export function IndexRoute() {
  return (
    <div style={{ padding: 32 }}>
      <h2>Welcome to the Smart Lightbulb demo</h2>
      <p>
        This site shows the evolution of a <strong>lightbulb</strong> as it
        grows in features and complexity. Each demo is accompanied with its
        corresponding <strong>state machine</strong>, which were created using
        the{" "}
        <a target="_blank" href="https://stately.ai">
          Stately Studio
        </a>
        , and are executed using{" "}
        <a href="https://stately.ai/docs/xstate" target="_blank">
          XState v5
        </a>
        .
      </p>
      <p>
        The demos are ordered logically, where the next demo includes everything
        from the previous one.
      </p>
      <p>
        ❗ The first three demos also make usage of the{" "}
        <strong>Stately Inspector</strong>, which should have already opened in
        a new tab if you allowed pop-ups. The inspector helps to follow the
        state machine's events and context.
      </p>
      <p>
        <small>
          Header's background animation was created using{" "}
          <a href="https://www.gradient-animator.com/" target="_blank">
            CSS Gradient Animator
          </a>
          .
        </small>
      </p>
    </div>
  );
}
