const getPokemonsTypes = async (pokemon) => {
  try {
    const types = await pokemon.types;
    const type = types.map((e) => e.type).map((e) => e.name);
    return type.join(" & ");
  } catch (err) {
    console.error(err);
  }
};

module.exports = getPokemonsTypes;
