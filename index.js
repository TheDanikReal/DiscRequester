const { API } = require("easy-api.ts");
const api = new API({
    port: process.env.PORT || 3000,
    spaces: 1
})

api.interpreter.addFunction({
  data: new FunctionBuilder()
  .setName('includes')
  .setValue('description', 'Check if this string has the provided texts.')
  .setValue('use', '$includes[string;text;text;...]')
  .setValue('returns', 'Boolean'),
  code: async d => {
    let r = d.unpack(d);
    if (!r.inside) return Utils.Warn('Invalid inside provided in:', d.func);
    let [string, ...texts] = r.splits;
      if(!string) return Utils.Warn('Missing string in:', d.func);
      if(!texts[0]) return Utils.Warn('Missing text to search in:', d.func);
    let includes = false;
    for (let text of texts) {
      if (string.includes(text)) includes = true;
    }
    return {
      code: d.code.resolve(`${d.func}[${r.inside}]`, includes)
    };
  }
})

api.interpreter.addFunction({
    data: new FunctionBuilder()
    .setName('stringStartsWith')
    .setValue('description', 'Check if a string starts with text.')
    .setValue('use', '$stringStartsWith[string;check]')
    .setValue('returns', 'Boolean'),
    code: async d => {
      let r = d.unpack(d);
      if (!r.inside) return Utils.Warn('Invalid inside provided in:', d.func);
      let [string, check] = r.splits;
      if (!string) return Utils.Warn('String is required in:', d.func);
      if (!check) return Utils.Warn('Check is required in:', d.func);
        return {
            code: d.code.resolve(`${d.func}[${r.inside}]`, string.startsWith(check.unescape()))
        };
    }
})

api.routes.load('./routes').then(() => {
    console.log('Source loaded.')
    api.connect()
})
