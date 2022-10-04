//use crate wasm_bindgen
use wasm_bindgen::prelude::*;
//use js_sys
use wasm_bindgen::JsValue;
use rand::*;


#[wasm_bindgen]
struct Wizard {
    name: String,
    spells: Vec<Spell>,
}


#[wasm_bindgen]
struct Spell {
    name: String,
    damage: u32,
}

#[wasm_bindgen]
impl Spell {
    #[wasm_bindgen(constructor)]
    pub fn new(name: &str, damage: u32) -> Spell {
        Spell {
            name: name.to_string(),
            damage,
        }
    }
}



#[wasm_bindgen]
impl Wizard {
    #[wasm_bindgen(constructor)]
    pub fn new(name: String) -> Wizard {
        Wizard {
            name: name,
            spells: Vec::new(),
        }
    }

    //returns random spell
    fn crateRandomSpell() -> Spell {
        let mut rng = rand::thread_rng();
        let spellName = match rng.gen_range(0..3) {
            0 => "Fireball",
            1 => "Lightning",
            2 => "Ice",
            _ => "Fireball",
        };
        let spellDamage = rng.gen_range(1..10);
        Spell::new(spellName, spellDamage)
    } 

    pub fn cast_spell(&mut self) -> usize {
        let randomSpell = Wizard::crateRandomSpell();
        self.spells.push(randomSpell);
        //return lenght of spells
        self.spells.len()
    }

    //get spells as a string separated by comma
    pub fn get_spells(&self) -> JsValue {
        let mut spells = String::new();
        for spell in &self.spells {
            spells.push_str(&spell.name);
            spells.push_str(", ");
        }
        JsValue::from_str(&spells)
    }
}
