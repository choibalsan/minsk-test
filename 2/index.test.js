describe("throttleIfMoreThanN(f, 3, 1000)", function () {
  let trottledFunc;
  let log;

  function funcForTest(a) {
    log += a;
  }

  beforeAll(function () {
    log = "";
    trottledFunc = throttleIfMoreThanN(funcForTest, 3, 1000);
    jasmine.clock().install();
  });

  afterAll(function () {
    jasmine.clock().uninstall();
  });

  it("первые 3 вызова сработают синхронно", function () {
    trottledFunc(1);
    trottledFunc(2);
    trottledFunc(3);
    expect(log).toEqual("123");
  });

  it("тормозит 4, 5 срабатывание до 1000мс", function () {
    trottledFunc(4);
    trottledFunc(5);
    expect(log).toEqual("123");

    jasmine.clock().tick(1000);
    expect(log).toEqual("123");
  });

  it("3 вызова с промежутком меньше 1000 после пердыдущего фрейма выполнятся", function () {
    trottledFunc(6);
    expect(log).toEqual("1236");
    jasmine.clock().tick(500);
    trottledFunc(7);
    expect(log).toEqual("12367");
    trottledFunc(8);
    expect(log).toEqual("123678");
  });
});