import Page from '../page';

class EditLaunchModal extends Page{
    get['Add new attribute button'](){
     return `//div[starts-with(@class,'attributeList__add-new-button')]`
    }
    get['Save edit'](){
        return `//button[text()='Save']`
    }

    get['Key attribute'](){
        return `[role='combobox'] ul:first-of-type`
    }
    get['Value attribute'](){
        return `[class^=autocompleteMenu__opened]`
    }
    get['Key Input'](){
        return `[placeholder='Key']`
    }
    get['Value Input'](){
        return `[placeholder='Value']`
    }

    get['Apply attrubute button'](){
        return `[class^=attributeEditor__icon]`
    }

    async addNewAttributes(attributes){
        for (const attribute of attributes) {
            const env = attribute.Env;
            const value = attribute.Value;
            await this.setValueToInputField(this['Key Input'], env)
            await this.waitForElementAndClick(this['Key attribute']);
            await this.setValueToInputField(this['Value Input'], value)
            await this.waitForElementAndClick(this['Value attribute']);
            await this.waitForElementAndClick(this['Apply attrubute button']);
        }
    }
}
export default new EditLaunchModal();
