console.log("싱글턴 패턴");

class IdGenerator {
  static #instance = new IdGenerator(); // 캡슐화 + 즉시 초기화
  static getInstance() {
    // if (this.#instance === null) this.#instance = new IdGenerator(); // 늦은 초기화
    return this.#instance;
  }
}

console.log(IdGenerator.getInstance());
