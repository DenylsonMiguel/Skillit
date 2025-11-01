import skillService from "../services/skillService.js";


class SkillController {
    private service = skillService();
}

const skillController = new SkillController();

export default skillController;