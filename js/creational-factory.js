/* 
- 팩터리 패턴은 상위 클래스나 인터페이스를 상속하는 하위 클래스와 같이 비록 유형은 다르지만 서로 관련된어 있는 개체를 주어진 개체 타입에 맞게 생성하는 데 사용된다
*/

// simple factory
class JsonRuleConfigParser {
  parser() {}
}
class XmlRuleConfigParser {
  parser() {}
}
class YamlRuleConfigParser {
  parser() {}
}
class PropertiesRuleConfigParser {
  parser() {}
}
class InvaildRuleConfigException {}
class RuleConfigSource {
  load(ruleConfigFilePath) {
    if (typeof ruleConfigFilePath !== "string") return;

    const ruleConfigFileExtension = this.#getFileExtension(ruleConfigFilePath);
    const parser = RuleConfigParserFactory.createParser(ruleConfigFileExtension);

    if (parser === null) {
      throw new InvaildRuleConfigException("일치하는 확장자가 없습니다");
    }

    return parser.parser();
  }

  #getFileExtension(filePath) {
    return filePath.split(".").at(-1);
  }
}
class RuleConfigParserFactory {
  static createParser(configFormat) {
    let parser = null;
    if ("json" === configFormat) {
      parser = new JsonRuleConfigParser();
    } else if ("xml" === configFormat) {
      parser = new XmlRuleConfigParser();
    } else if ("yaml" === configFormat) {
      parser = new YamlRuleConfigParser();
    } else if ("properties" === configFormat) {
      parser = new PropertiesRuleConfigParser();
    }
    return parser;
  }
}

/* 
    if 분기 판단 논리를 제거하는 고전적인 방법은 분기 판단 논리 대신 다형성을 사용하는 것이다. 
    팩터리 메소드 패턴은 단순 팩터리 패턴보다 개방 폐쇄 원리에 더 가깝다.
*/
// factory method
class IRuleConfigParserFactory {
  parser() {}
}
class JsonRuleConfigParserFactory extends IRuleConfigParserFactory {
  parser() {
    return JsonRuleConfigParser();
  }
}
class XmlRuleConfigParserFactory extends IRuleConfigParserFactory {
  parser() {
    return XmlRuleConfigParser();
  }
}
class YamlRuleConfigParserFactory extends IRuleConfigParserFactory {
  parser() {
    return YamlRuleConfigParser();
  }
}
class PropertiesRuleConfigParserFactory extends IRuleConfigParserFactory {
  parser() {
    return PropertiesRuleConfigParser();
  }
}

class RuleConfigParserFactoryMap {
  static #cachedFactories = new Map();
  static {
    this.#cachedFactories.set("json", new JsonRuleConfigParserFactory());
    this.#cachedFactories.set("xml", new XmlRuleConfigParserFactory());
    this.#cachedFactories.set("yaml", new YamlRuleConfigParserFactory());
    this.#cachedFactories.set("properties", new PropertiesRuleConfigParserFactory());
  }
  static getParserFactory(type) {
    if (type === null || type === undefined || type.trim() === "") return null;
    const parserFactory = this.#cachedFactories.get(type.toLowerCase());
    return parserFactory;
  }
}

class _RuleConfigSource {
  load(ruleConfigFilePath) {
    if (typeof ruleConfigFilePath !== "string") return;

    const ruleConfigFileExtension = this.#getFileExtension(ruleConfigFilePath);
    const parser = RuleConfigParserFactoryMap.getParserFactory(ruleConfigFileExtension);

    if (parser === null) {
      throw new InvaildRuleConfigException("일치하는 확장자가 없습니다");
    }

    return parser.parser();
  }

  #getFileExtension(filePath) {
    return filePath.split(".").at(-1);
  }
}

console.log(RuleConfigParserFactoryMap.getParserFactory("json"));
// abstract factory
