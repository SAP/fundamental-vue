import { Component, Prop, Base } from '@/core';
import { Button, ButtonType } from '@/components/Button';

interface Props {
  title?: string;
  icon?: string;
  type?: ButtonType;
  disabled?: boolean;
}

@Component('CalendarAction')
export class CalendarAction extends Base<Props> {
  @Prop(String) public title!: string | null;
  @Prop(String) public icon!: string | null;
  @Prop({type: Boolean, default: false}) public disabled!: boolean;
  @Prop({type: String, default: null}) public type!: ButtonType | null;

  public render() {
    return (
      <div class='fd-calendar__action'>
        <Button
          state={this.disabled ? 'disabled' : 'normal'}
          icon={this.icon}
          compact={true}
          styling='light'
          type={this.type || undefined}
          on-click={() => this.$emit('click')}
        >
          {this.title}
        </Button>
      </div>
    );
  }
}
