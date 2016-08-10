//clase contacto

class Contacto {
    constructor(row) {
        this.id = _.uniqueId();
        this.name = row.name;
        this.last_name = row.last_name;
        this.email = row.email;
        this.country = row.country;
    }
}
