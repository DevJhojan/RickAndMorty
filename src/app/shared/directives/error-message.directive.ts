import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

@Directive({
  selector: '[appErrorMessage]'
})
export class ErrorMessageDirective {
  private _errors: ValidationErrors | null = null;
  private _dirty = false;
  private _touched = false;
  nativeElement: any;

  @Input() set touched(value: boolean) {
    this._touched = value;
    this.setMessage();
  }

  @Input() set dirty(value: boolean) {
    this._dirty = value;
    this.setMessage();
  }

  @Input() set errors(value: ValidationErrors | null) {
    this._errors = value;
    this.setMessage();
  }

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2,
  ) {
    this.nativeElement = elementRef.nativeElement;
  }
  fieldMinLength(errors: ValidationErrors) {
    return `Debe contener como mínimo de caracteres ${errors['minlength']['requiredLength']}.`;
  }
  fieldMaxLength(errors: ValidationErrors): string {
    return `Debe contener como máximo de caracteres ${errors['maxlength']['requiredLength']}.`;
  }
  fieldMin(errors: ValidationErrors) {
    return `Numero mínimo permitido es ${errors['min']['requiredMin']}.`;
  }
    fieldMax(errors: ValidationErrors): string {
    return `Numero maximo permitido es ${errors['max']['requiredMax']}.`;
  }

  get fieldPattern() {
    return `No cumple con el formato.`;
  }

  get fieldIdentification() {
    return `No cumple con el formato de una cédula Ecuatoriana.`;
  }

  get fieldNoPasswordMatch(): string {
    return 'Las contraseñas no coinciden.';
  }

  get fieldUserNotAvailable(): string {
    return 'Este usuario ya se encuentra registrado.';
  }

  get fieldUserAvailable(): string {
    return 'Usuario está disponible.';
  }

  get fieldEmailNotAvailable(): string {
    return 'Este correo electrónico no está disponible.';
  }

  get fieldPhoneNotAvailable(): string {
    return 'Este teléfono no está disponible.';
  }

  get fieldDateValid(): string {
    return 'No es una fecha válida.';
  }

  fieldDateMax(errors: ValidationErrors): string {
    return `La fecha ${errors['dateMax']['actualDate']} no puede ser mayor a ${errors['dateMax']['requiredDate']}.`;
  }

  fieldDateMin(errors: ValidationErrors): string {
    return `La fecha ${errors['dateMin']['actualDate']} no puede ser menor a ${errors['dateMin']['requiredDate']}.`;
  }
  setMessage() {
    if (this._touched || this._dirty) {
      if (this._errors) {
        if (this._errors['required']) {
          this.nativeElement.innerText = 'El campo es obligatorio.';
        }
        if (this._errors['requiredTrue']) {
          this.nativeElement.innerText = 'El campo es obligatorio.';
        }
        if (this._errors['email']) {
          this.nativeElement.innerText = 'Correo electrónico no válido.';
        }
        if (this._errors['minlength']) {
          this.nativeElement.innerText = this.fieldMinLength(
            this._errors
          );
        }
        if (this._errors['maxlength']) {
          this.nativeElement.innerText = this.fieldMaxLength(
            this._errors
          );
        }
        if (this._errors['min']) {
          this.nativeElement.innerText = this.fieldMin(
            this._errors
          );
        }
        if (this._errors['max']) {
          this.nativeElement.innerText = this.fieldMax(
            this._errors
          );
        }
        if (this._errors['pattern']) {
          this.nativeElement.innerText = this.fieldPattern;
        }
        if (this._errors['identification']) {
          this.nativeElement.innerText =
            this.fieldIdentification;
        }
        if (this._errors['NoPasswordMatch']) {
          this.nativeElement.innerText =
            this.fieldNoPasswordMatch;
        }
        if (this._errors['UserNotAvailable']) {
          this.nativeElement.innerText =
            this.fieldUserNotAvailable;
        }
        if (this._errors['UserAvailable']) {
          this.nativeElement.innerText = this.fieldUserAvailable;
        }
        if (this._errors['EmailNotAvailable']) {
          this.nativeElement.innerText =
            this.fieldEmailNotAvailable;
        }
        if (this._errors['PhoneNotAvailable']) {
          this.nativeElement.innerText =
            this.fieldPhoneNotAvailable;
        }
        if (this._errors['dateInvalid']) {
          this.nativeElement.innerText = this.fieldDateValid;
        }
        if (this._errors['dateMax']) {
          this.nativeElement.innerText = this.fieldDateMax(
            this._errors
          );
        }
        if (this._errors['dateMin']) {
          this.nativeElement.innerText = this.fieldDateMin(
            this._errors
          );
        }
        if (this._errors['noPasswordMatch']) {
          this.nativeElement.innerText = this.fieldNoPasswordMatch;
        }
        this.renderer.addClass(this.nativeElement, 'incorrect');
        this.renderer.removeClass(this.nativeElement, 'hidden');
      } else {
        this.renderer.addClass(this.nativeElement, 'hidden');
      }
    }
  }

}
