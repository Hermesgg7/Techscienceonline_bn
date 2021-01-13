import { validators as authValidators } from "./auth/auth.validator";
import { validators as accountValidators } from "./account/account.validator";
import { validators as membershipValidators } from "./membership/membership.validator";
import { validators as roleValidators } from "./role/role.validator";
import { validators as subjectValidators } from "./subject/subject.validator";
import { validators as courseValidators } from "./course/course.validator";
import { validators as userValidators } from "./user/user.validator";
import { validators as levelValidators } from "./level/level.validator";
import { validators as examValidators } from "./exam/exam.validator";
import { validators as questionValidators } from "./question/question.validator";
import { validators as choiceValidators } from "./choice/choice.validator";
import { validators as resultValidators } from "./result/result.validator";
import { validators as speechValidators } from "./speech/speech.validator";

export const validators = {
  Query: {
    ...authValidators.Query,
    ...accountValidators.Query,
    ...membershipValidators.Query,
    ...roleValidators.Query,
    ...subjectValidators.Query,
    ...courseValidators.Query,
    ...userValidators.Query,
    ...levelValidators.Query,
    ...examValidators.Query,
    ...questionValidators.Query,
    ...choiceValidators.Query,
    ...resultValidators.Query,
    ...speechValidators.Query
  },
  Mutation: {
    ...authValidators.Mutation,
    ...accountValidators.Mutation,
    ...membershipValidators.Mutation,
    ...roleValidators.Mutation,
    ...subjectValidators.Mutation,
    ...courseValidators.Mutation,
    ...userValidators.Mutation,
    ...levelValidators.Mutation,
    ...examValidators.Mutation,
    ...questionValidators.Mutation,
    ...choiceValidators.Mutation,
    ...resultValidators.Mutation,
    ...speechValidators.Mutation
  }
}