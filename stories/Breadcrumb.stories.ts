import { IonIconModule } from './../projects/ion/src/lib/icon/icon.module';
import { CommonModule } from '@angular/common';
import { Meta, Story } from '@storybook/angular';
import { IonBreadcrumbComponent } from '../projects/ion/src/lib/breadcrumb/breadcrumb.component';

export default {
  title: 'Ion/Navigation/Breadcrumb',
  component: IonBreadcrumbComponent,
} as Meta;

const Template: Story<IonBreadcrumbComponent> = (
  args: IonBreadcrumbComponent
) => ({
  component: IonBreadcrumbComponent,
  props: args,
  moduleMetadata: {
    declarations: [IonBreadcrumbComponent],
    imports: [CommonModule, IonIconModule],
  },
});

const breadcrumbs = [
  { label: 'Home', link: '/home' },
  { label: 'Recursos', link: '/recursos' },
  { label: 'Técnico', link: '/recursos/1' },
];

export const Initials = Template.bind({});
Initials.args = {
  breadcrumbs,
};
