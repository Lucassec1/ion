import { IonIconModule } from './../icon/icon.module';
import { SafeAny } from './../utils/safe-any';
import { fireEvent, render, screen } from '@testing-library/angular';
import {
  IonBreadcrumbComponent,
  BreadcrumbItem,
  BreadcrumbProps,
} from './breadcrumb.component';

const selectEvent = jest.fn();

const items: BreadcrumbItem[] = [
  {
    label: 'Inicio',
    link: '/home',
  },
  {
    label: 'Recursos',
    link: '/recursos',
  },
  {
    label: 'Tecnico',
    link: '/recursos/1',
  },
];

const sut = async (
  customProps: BreadcrumbProps = {
    selected: {
      emit: selectEvent,
    },
  } as SafeAny
): Promise<void> => {
  await render(IonBreadcrumbComponent, {
    componentProperties: {
      breadcrumbs: items,
      ...customProps,
    },
    imports: [IonIconModule],
  });
};

describe('Breadcrumb', () => {
  beforeEach(async () => {
    await sut();
  });

  it.each(items)(
    'should render %s in breadcrumb',
    async (link: BreadcrumbItem) => {
      expect(screen.getByText(link.label)).toBeInTheDocument();
    }
  );

  it('should render recursos in breadcrumb', async () => {
    expect(screen.getByText('Recursos')).toHaveClass('breacrumbs-link');
  });

  it('should emit the selected breadcrumb', async () => {
    const [firstItem] = items;

    const element = screen.getByText(firstItem.label);
    fireEvent.click(element);
    expect(selectEvent).toBeCalledTimes(1);
    expect(selectEvent).toBeCalledWith(firstItem);
  });

  it('should not emit the selected breadcrumb is the last one', async () => {
    const lastItem = items[items.length - 1];

    const element = screen.getByText(lastItem.label);
    fireEvent.click(element);
    expect(selectEvent).toBeCalledTimes(0);
    expect(selectEvent).not.toBeCalledWith(lastItem);
  });

  afterEach(() => {
    selectEvent.mockClear();
  });
});
