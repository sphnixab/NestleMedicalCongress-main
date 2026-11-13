import { fireEvent, render } from '@testing-library/react-native';
import React from 'react';
import { AppButton } from '../../src/components/common/AppButton';
import { VoteCard } from '../../src/components/cards/VoteCard';
import { mockPolls } from '../../src/data/mockVoting';

describe('AppButton', () => {
  it('calls onPress', () => {
    const onPress = jest.fn();
    const { getByText } = render(<AppButton title="Sign In" onPress={onPress} />);
    fireEvent.press(getByText('Sign In'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('does not fire while loading', () => {
    const onPress = jest.fn();
    const { getByRole } = render(<AppButton title="Sign In" onPress={onPress} loading />);
    fireEvent.press(getByRole('button'));
    expect(onPress).not.toHaveBeenCalled();
  });
});

describe('VoteCard', () => {
  it('shows percentages and reports the selected option', () => {
    const onSelect = jest.fn();
    const { getByText, getByLabelText } = render(
      <VoteCard poll={mockPolls[0]} voted={false} onSelect={onSelect} />,
    );
    expect(getByText('54%')).toBeTruthy();
    fireEvent.press(getByLabelText('Very Good, 31 percent'));
    expect(onSelect).toHaveBeenCalledWith('p-01-b');
  });

  it('locks options after voting', () => {
    const onSelect = jest.fn();
    const { getByLabelText } = render(
      <VoteCard poll={mockPolls[0]} voted selectedOptionId="p-01-b" onSelect={onSelect} />,
    );
    fireEvent.press(getByLabelText('Excellent, 54 percent'));
    expect(onSelect).not.toHaveBeenCalled();
  });
});
