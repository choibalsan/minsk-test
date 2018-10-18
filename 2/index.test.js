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

  it("тормозит 4, 5 срабатывание до 1000мс, 5ое отработает после тика", function () {
    trottledFunc(4);
    trottledFunc(5);
    expect(log).toEqual("123");

    jasmine.clock().tick(1000);
    expect(log).toEqual("1235");
  });

  it("3 вызова с промежутком меньше 1000 после выполнения отложенного запускасработают без задержки", function () {
    trottledFunc(6);
    expect(log).toEqual("12356");
    jasmine.clock().tick(500);
    trottledFunc(7);
    expect(log).toEqual("123567");
    trottledFunc(8);
    expect(log).toEqual("1235678");
  });

  it("3 вызова с промежутками до истечения 1000, после тика отработает только последний вызов", function () {
    jasmine.clock().tick(400);
    trottledFunc(9);
    trottledFunc(10);
    trottledFunc(11);
    expect(log).toEqual("1235678");
    jasmine.clock().tick(500);
    expect(log).toEqual("123567811");
  });

  it("убедиться что в очереди на выполнении ничего не осталось", function () {
    jasmine.clock().tick(1001);
    expect(log).toEqual("123567811");
  });

});