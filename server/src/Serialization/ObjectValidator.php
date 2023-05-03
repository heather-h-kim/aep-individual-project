<?php

namespace App\Serialization;

use Symfony\Component\Validator\ConstraintViolation;
use Symfony\Component\Validator\ConstraintViolationList;
use Symfony\Component\Validator\Validator\ValidatorInterface;

/** @codeCoverageIgnore Copied from reference project */
class ObjectValidator
{
    private ValidatorInterface $validator;

    public function __construct(ValidatorInterface $validator)
    {
        $this->validator = $validator;
    }

    public function getValidationErrorsJson(object $object): string
    {
        /** @var ConstraintViolationList $errors */
        $errors = $this->validator->validate($object);

        if (0 === count($errors)) {
            return '';
        }

        return json_encode(
            array_map(
                static function (ConstraintViolation $error) {
                    return [
                        'fieldPath' => $error->getPropertyPath(),
                        'errorMessage' => $error->getMessage(),
                        'value' => $error->getInvalidValue(),
                    ];
                },
                $errors->getIterator()->getArrayCopy()
            ),
            JSON_THROW_ON_ERROR
        );
    }
}
